# OrderItemDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**productId** | **string** |  | [default to undefined]
**variantId** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**sku** | **string** |  | [optional] [default to undefined]
**price** | **number** |  | [default to undefined]
**quantity** | **number** |  | [default to undefined]
**subtotal** | **number** |  | [default to undefined]
**metadata** | **{ [key: string]: any; }** |  | [optional] [default to undefined]

## Example

```typescript
import { OrderItemDto } from './api';

const instance: OrderItemDto = {
    productId,
    variantId,
    name,
    sku,
    price,
    quantity,
    subtotal,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
