# PaymentApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**paymentControllerCreateOrder**](#paymentcontrollercreateorder) | **POST** /api/payment/create-order | |
|[**paymentControllerCreateOrderLink**](#paymentcontrollercreateorderlink) | **POST** /api/payment/create-order-link | |
|[**paymentControllerVerifyPayment**](#paymentcontrollerverifypayment) | **POST** /api/payment/verify | |

# **paymentControllerCreateOrder**
> paymentControllerCreateOrder(createOrderDto)


### Example

```typescript
import {
    PaymentApi,
    Configuration,
    CreateOrderDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let createOrderDto: CreateOrderDto; //

const { status, data } = await apiInstance.paymentControllerCreateOrder(
    createOrderDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createOrderDto** | **CreateOrderDto**|  | |


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

# **paymentControllerCreateOrderLink**
> paymentControllerCreateOrderLink(createOrderDto)


### Example

```typescript
import {
    PaymentApi,
    Configuration,
    CreateOrderDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let createOrderDto: CreateOrderDto; //

const { status, data } = await apiInstance.paymentControllerCreateOrderLink(
    createOrderDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createOrderDto** | **CreateOrderDto**|  | |


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

# **paymentControllerVerifyPayment**
> paymentControllerVerifyPayment(body)


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let body: object; //

const { status, data } = await apiInstance.paymentControllerVerifyPayment(
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

