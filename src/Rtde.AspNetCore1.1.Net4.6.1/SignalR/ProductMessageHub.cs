using Microsoft.AspNet.SignalR;
using RealTimeDataEditor.Core;
using RealTimeDataEditor.DataAccess;

namespace RealTimeDataEditor
{
    public class ProductMessageHub : Hub
    {
        public void HandleProductMessage(string receivedString)
        {
            var responseString = string.Empty;

            bool dataProcessedSuccessfully =
                ProductMessageHandler.HandleMessage(receivedString, ref responseString);

            // Thread.Sleep(1000);

            if (dataProcessedSuccessfully)
            {
                Clients.All.handleProductMessage(responseString);
            }
            else
            {
                Clients.Caller.handleProductMessage(responseString);
            }
        }

        private readonly IProductsRepository productsRepository;

        public ProductMessageHub()
        {
            productsRepository = new ProductsRepository();
        }

        public void AddProduct(Product product)
        {
            productsRepository.Insert(product);

            Clients.All.productAdded(product);
        }

        public void UpdateProduct(Product product)
        {
            productsRepository.Update(product);

            Clients.All.productUpdated(product);
        }

        public void RemoveProduct(int productId)
        {
            productsRepository.Delete(productId);

            Clients.All.productRemoved(productId);
        }
    }
}