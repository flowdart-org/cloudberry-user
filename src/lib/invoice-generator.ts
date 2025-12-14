
import { OrderResponseDto } from "@/api/order/order.dto";
import { formatDate } from "./utils";

export function generateInvoiceHTML(order: OrderResponseDto): string {
  const invoiceDate = formatDate(order.placedAt as string, { includeTime: false });
  const deliveryDate = order.deliveredAt ? formatDate(order.deliveredAt) : "Pending";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice - ${order.orderNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f5f5f5;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 20px;
        }

        .company-info h1 {
          font-size: 28px;
          color: #000;
          margin-bottom: 5px;
        }

        .company-info p {
          font-size: 13px;
          color: #666;
        }

        .invoice-details {
          text-align: right;
        }

        .invoice-details h2 {
          font-size: 24px;
          color: #000;
          margin-bottom: 15px;
        }

        .detail-row {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 5px;
          font-size: 13px;
        }

        .detail-label {
          color: #666;
          min-width: 80px;
          text-align: right;
        }

        .detail-value {
          color: #000;
          font-weight: 500;
        }

        .customer-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 12px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .customer-details, .billing-details {
          font-size: 13px;
        }

        .customer-details p, .billing-details p {
          margin-bottom: 8px;
        }

        .items-section {
          margin-bottom: 40px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        table thead {
          background: #f9f9f9;
          border-top: 1px solid #e0e0e0;
          border-bottom: 2px solid #e0e0e0;
        }

        table th {
          padding: 12px;
          text-align: left;
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 13px;
        }

        table tbody tr:last-child td {
          border-bottom: none;
        }

        .item-name {
          font-weight: 500;
          color: #000;
        }

        .item-description {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }

        .text-right {
          text-align: right;
        }

        .summary {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 40px;
        }

        .summary-table {
          width: 350px;
        }

        .summary-table table {
          margin-bottom: 0;
        }

        .summary-table tr {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 13px;
        }

        .summary-table tr:last-child {
          border-bottom: none;
        }

        .summary-table tr.total {
          border-top: 2px solid #000;
          padding-top: 15px;
          font-weight: 600;
          font-size: 16px;
        }

        .summary-label {
          color: #666;
        }

        .summary-value {
          color: #000;
          font-weight: 500;
        }

        .status-section {
          margin-top: 40px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 4px;
          font-size: 13px;
        }

        .status-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .status-row:last-child {
          margin-bottom: 0;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
          font-size: 12px;
          color: #999;
        }

        @media print {
          body {
            background: white;
          }
          .container {
            box-shadow: none;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="company-info">
            <h1>INVOICE</h1>
            <p>ZenFashion Studio</p>
            <p>Premium Fashion Retailer</p>
          </div>
          <div class="invoice-details">
            <h2>${order.orderNumber}</h2>
            <div class="detail-row">
              <span class="detail-label">Invoice Date:</span>
              <span class="detail-value">${invoiceDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Order Status:</span>
              <span class="detail-value">${order.orderStatus}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Status:</span>
              <span class="detail-value">${order.paymentStatus}</span>
            </div>
          </div>
        </div>

        <!-- Customer & Billing -->
        <div class="customer-section">
          <div>
            <div class="section-title">Bill To</div>
            <div class="customer-details">
              <p><strong>${order.customer?.name || 'Customer'}</strong></p>
              <p>${order.customer?.email || 'N/A'}</p>
              <p>${order.customer?.phone || 'N/A'}</p>
            </div>
          </div>
          <div>
            <div class="section-title">Shipping Address</div>
            <div class="billing-details">
              <p><strong>${order.customer?.name || 'Customer'}</strong></p>
              <p>${order.shippingAddress?.houseNo ? `${order.shippingAddress.houseNo}, ` : ''}${order.shippingAddress?.street || ''}</p>
              <p>${order.shippingAddress?.city || ''}${order.shippingAddress?.city && order.shippingAddress?.state ? ', ' : ''}${order.shippingAddress?.state || ''}</p>
              <p>${order.shippingAddress?.country || ''}${order.shippingAddress?.pincode ? ` - ${order.shippingAddress.pincode}` : ''}</p>
              <p style="margin-top:8px;">Email: ${order.customer?.email || 'N/A'}</p>
              <p>Phone: ${order.customer?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div class="items-section">
          <div class="section-title" style="margin-bottom: 15px;">Order Items</div>
          <table>
            <thead>
              <tr>
                <th style="width: 40%;">Product</th>
                <th style="width: 15%;">Size</th>
                <th style="width: 15%; text-align: right;">Qty</th>
                <th style="width: 15%; text-align: right;">Price</th>
                <th style="width: 15%; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>
                    <div class="item-name">${item?.product.name || 'Product'}</div>
                  </td>
                  <td>${item.variant?.size || 'N/A'}</td>
                  <td class="text-right">${item.quantity || 1}</td>
                  <td class="text-right">₹${((item.product?.price || 0) / (item.quantity || 1)).toFixed(2)}</td>
                  <td class="text-right">₹${(item.product?.price || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Summary -->
        <div class="summary">
          <div class="summary-table">
            <div class="summary-row">
              <span class="summary-label">Subtotal</span>
              <span class="summary-value">₹${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Shipping Charge</span>
              <span class="summary-value">₹${order.shippingCharge.toFixed(2)}</span>
            </div>
            ${order.discount > 0 ? `
            <div class="summary-row">
              <span class="summary-label">Discount</span>
              <span class="summary-value" style="color: #22c55e;">-₹${order.discount.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="summary-row total">
              <span>TOTAL</span>
              <span>₹${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Status Section -->
        <div class="status-section">
          <div class="section-title" style="margin-bottom: 15px;">Order Timeline</div>
          <div class="status-row">
            <span>Order Placed:</span>
            <strong>${invoiceDate}</strong>
          </div>
          ${order.deliveredAt ? `
          <div class="status-row">
            <span>Delivered:</span>
            <strong>${deliveryDate}</strong>
          </div>
          ` : ''}
          <div class="status-row">
            <span>Current Status:</span>
            <strong>${order.orderStatus}</strong>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>Thank you for your purchase! This is an auto-generated invoice.</p>
          <p>For inquiries, please contact our customer support.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function downloadInvoicePDF(order: OrderResponseDto): void {
  const html = generateInvoiceHTML(order);
  
  // Create a blob from the HTML string
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Create a temporary iframe for printing to PDF
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;

  document.body.appendChild(iframe);

  // Wait for iframe to load, then trigger print dialog
  iframe.onload = () => {
    iframe.contentWindow?.print();
    
    // Clean up after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
    }, 1000);
  };
}

export function downloadInvoiceAsHTML(order: OrderResponseDto): void {
  const html = generateInvoiceHTML(order);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute("download", `invoice-${order.orderNumber}.html`);
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
