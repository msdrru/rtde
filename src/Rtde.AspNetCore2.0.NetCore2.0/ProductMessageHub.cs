using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RealTimeDataEditor.Core;

namespace RealTimeDataEditor
{
    public class Chat : Hub
    {
        public Task Send(string message)
        {
            return Clients.All.InvokeAsync("Send", message);
        }

        public void HandleProductMessage(string receivedString)
        {
            var responseString = string.Empty;

            bool dataProcessedSuccessfully =
                ProductMessageHandler.HandleMessage(receivedString, ref responseString);

            // Thread.Sleep(1000);

            if (dataProcessedSuccessfully)
            {
                // Clients.All.handleProductMessage(responseString);
            }
            else
            {
                // Clients.Caller.handleProductMessage(responseString);
            }
        }
    }
}