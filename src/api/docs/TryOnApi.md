# TryOnApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**tryOnControllerTryOn**](#tryoncontrollertryon) | **POST** /api/ai | |

# **tryOnControllerTryOn**
> tryOnControllerTryOn(body)


### Example

```typescript
import {
    TryOnApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TryOnApi(configuration);

let body: object; //

const { status, data } = await apiInstance.tryOnControllerTryOn(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

