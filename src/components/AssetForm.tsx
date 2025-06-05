import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { z } from 'zod';
import { Asset, AssetCategory } from '../types/asset';
import { Button } from './shared/Button';
import { Input } from './shared/Input';
import { Select } from './shared/Select';
import { Textarea } from './shared/Textarea';

const baseSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.enum(['Equipamento', 'Veículo', 'Software'], {
    required_error: 'Categoria é obrigatória'
  }),
  status: z.enum(['Ativo', 'Em manutenção', 'Inativo'], {
    required_error: 'Status é obrigatório'
  }),
  description: z.string().optional(),
  acquisitionDate: z.string().min(1, 'Data de aquisição é obrigatória')
});

const equipmentSchema = baseSchema.extend({
  serialNumber: z.string().min(1, 'Número de série é obrigatório'),
  supplier: z.string().min(1, 'Fornecedor é obrigatório')
});

const vehicleSchema = baseSchema.extend({
  licensePlate: z.string().min(1, 'Placa é obrigatória')
});

const softwareSchema = baseSchema.extend({
  licenseKey: z.string().min(1, 'Chave de licença é obrigatória'),
  licenseExpiration: z.string().min(1, 'Validade da licença é obrigatória')
});

const combinedSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.enum(['Equipamento', 'Veículo', 'Software'], {
    required_error: 'Categoria é obrigatória'
  }),
  status: z.enum(['Ativo', 'Em manutenção', 'Inativo'], {
    required_error: 'Status é obrigatório'
  }),
  description: z.string().optional(),
  acquisitionDate: z.string().min(1, 'Data de aquisição é obrigatória'),
  serialNumber: z.string().optional(),
  supplier: z.string().optional(),
  licensePlate: z.string().optional(),
  licenseKey: z.string().optional(),
  licenseExpiration: z.string().optional()
});

type FormData = z.infer<typeof combinedSchema>;

interface AssetFormProps {
  asset?: Asset;
  onSubmit: (data: Asset) => void;
  onCancel: () => void;
  loading?: boolean;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const categoryOptions = [
  { value: 'Equipamento', label: 'Equipamento' },
  { value: 'Veículo', label: 'Veículo' },
  { value: 'Software', label: 'Software' }
];

const statusOptions = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Em manutenção', label: 'Em manutenção' },
  { value: 'Inativo', label: 'Inativo' }
];

export const AssetForm: React.FC<AssetFormProps> = ({
  asset,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const validateDataByCategory = (data: FormData): Asset => {
    const { category } = data;

    switch (category) {
      case 'Equipamento':
        const equipmentResult = equipmentSchema.parse({
          name: data.name,
          category: data.category,
          status: data.status,
          description: data.description,
          acquisitionDate: data.acquisitionDate,
          serialNumber: data.serialNumber,
          supplier: data.supplier
        });
        return { ...equipmentResult, id: asset?.id || Date.now().toString() } as Asset;

      case 'Veículo':
        const vehicleResult = vehicleSchema.parse({
          name: data.name,
          category: data.category,
          status: data.status,
          description: data.description,
          acquisitionDate: data.acquisitionDate,
          licensePlate: data.licensePlate
        });
        return { ...vehicleResult, id: asset?.id || Date.now().toString() } as Asset;

      case 'Software':
        const softwareResult = softwareSchema.parse({
          name: data.name,
          category: data.category,
          status: data.status,
          description: data.description,
          acquisitionDate: data.acquisitionDate,
          licenseKey: data.licenseKey,
          licenseExpiration: data.licenseExpiration
        });
        return { ...softwareResult, id: asset?.id || Date.now().toString() } as Asset;

      default:
        throw new Error('Categoria inválida');
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    clearErrors,
    setError
  } = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      name: asset?.name || '',
      category: asset?.category || undefined,
      status: asset?.status || undefined,
      description: asset?.description || '',
      acquisitionDate: asset?.acquisitionDate || '',
      serialNumber: (asset as any)?.serialNumber || '',
      supplier: (asset as any)?.supplier || '',
      licensePlate: (asset as any)?.licensePlate || '',
      licenseKey: (asset as any)?.licenseKey || '',
      licenseExpiration: (asset as any)?.licenseExpiration || ''
    }
  });

  const selectedCategory = watch('category') as AssetCategory;

  useEffect(() => {
    if (selectedCategory) {
      const fieldsToKeep = ['name', 'category', 'status', 'description', 'acquisitionDate'];
      switch (selectedCategory) {
        case 'Equipamento':
          fieldsToKeep.push('serialNumber', 'supplier');
          break;
        case 'Veículo':
          fieldsToKeep.push('licensePlate');
          break;
        case 'Software':
          fieldsToKeep.push('licenseKey', 'licenseExpiration');
          break;
      }

      const allFields = ['serialNumber', 'supplier', 'licensePlate', 'licenseKey', 'licenseExpiration'];
      allFields.forEach(field => {
        if (!fieldsToKeep.includes(field)) {
          clearErrors(field as keyof FormData);
        }
      });
    }
  }, [selectedCategory, clearErrors]);

  useEffect(() => {
    if (asset) {
      reset({
        name: asset.name,
        category: asset.category,
        status: asset.status,
        description: asset.description || '',
        acquisitionDate: asset.acquisitionDate,
        serialNumber: (asset as any).serialNumber || '',
        supplier: (asset as any).supplier || '',
        licensePlate: (asset as any).licensePlate || '',
        licenseKey: (asset as any).licenseKey || '',
        licenseExpiration: (asset as any).licenseExpiration || ''
      });
    }
  }, [asset, reset]);

  const handleFormSubmit = (data: FormData) => {
    try {
      const validatedAsset = validateDataByCategory(data);
      onSubmit(validatedAsset);
    } catch (error) {
      if (data.category === 'Equipamento') {
        if (!data.serialNumber) {
          setError('serialNumber', { message: 'Número de série é obrigatório' });
        }
        if (!data.supplier) {
          setError('supplier', { message: 'Fornecedor é obrigatório' });
        }
      } else if (data.category === 'Veículo') {
        if (!data.licensePlate) {
          setError('licensePlate', { message: 'Placa é obrigatória' });
        }
      } else if (data.category === 'Software') {
        if (!data.licenseKey) {
          setError('licenseKey', { message: 'Chave de licença é obrigatória' });
        }
        if (!data.licenseExpiration) {
          setError('licenseExpiration', { message: 'Validade da licença é obrigatória' });
        }
      }
    }
  };

  const renderCategorySpecificFields = () => {
    switch (selectedCategory) {
      case 'Equipamento':
        return (
          <>
            <Input
              {...register('serialNumber')}
              id="serialNumber"
              label="Número de Série *"
              error={errors.serialNumber?.message}
            />
            <Input
              {...register('supplier')}
              id="supplier"
              label="Fornecedor *"
              error={errors.supplier?.message}
            />
          </>
        );
      case 'Veículo':
        return (
          <Input
            {...register('licensePlate')}
            id="licensePlate"
            label="Placa *"
            error={errors.licensePlate?.message}
          />
        );
      case 'Software':
        return (
          <>
            <Input
              {...register('licenseKey')}
              id="licenseKey"
              label="Chave de Licença *"
              error={errors.licenseKey?.message}
            />
            <Input
              {...register('licenseExpiration')}
              id="LicenseExpiration"
              type="date"
              label="Validade da Licença *"
              error={errors.licenseExpiration?.message}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormGrid>
        <Input
          {...register('name')}
          id="name"
          label="Nome *"
          error={errors.name?.message}
        />
        <Select
          {...register('category')}
          id="category"
          label="Categoria *"
          options={categoryOptions}
          placeholder="Selecione uma categoria"
          error={errors.category?.message}
        />
        <Select
          {...register('status')}
          id="status"
          label="Status *"
          options={statusOptions}
          placeholder="Selecione um status"
          error={errors.status?.message}
        />
        <Input
          {...register('acquisitionDate')}
          id="acquisitionDate"
          type="date"
          label="Data de Aquisição *"
          error={errors.acquisitionDate?.message}
        />
        {renderCategorySpecificFields()}
      </FormGrid>
      <Textarea
        {...register('description')}
        id="description"
        label="Descrição"
        placeholder="Descrição do ativo (opcional)"
        error={errors.description?.message}
      />
      <FormActions>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {asset ? 'Atualizar' : 'Cadastrar'} Ativo
        </Button>
      </FormActions>
    </Form>
  );
};