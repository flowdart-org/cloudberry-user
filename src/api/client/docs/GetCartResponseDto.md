# GetCartResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique identifier for the cart | [default to undefined]
**count** | **number** | Total number of items in the cart | [default to undefined]
**items** | [**Array&lt;GetCartResponseDtoItemsInner&gt;**](GetCartResponseDtoItemsInner.md) | List of items in the cart | [default to undefined]
**createdAt** | **string** | Timestamp when the cart was created | [default to undefined]
**updatedAt** | **string** | Timestamp when the cart was last updated | [default to undefined]

## Example

```typescript
import { GetCartResponseDto } from './api';

const instance: GetCartResponseDto = {
    id,
    count,
    items,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
