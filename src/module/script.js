/**
 * 
 * 
 * 
 */

//<script src="https://cdn.jsdelivr.net/npm/@woodwing/assets-client-sdk"></script>
// esm.run is powered by jsDelivr
// https://www.jsdelivr.com/esm
import AssetsClientSdk from "https://esm.run/@woodwing/assets-client-sdk";


async function init() {
    try {
        console.log('>>> init()');

        const contextService = await AssetsClientSdk.AssetsPluginContext.get();
        const APIService = await AssetsClientSdk.AssetsApiClient.fromPluginContext(contextService);
        const context = contextService.context;

        document.getElementById("start").style.display = "none";
        document.getElementById("main").style.display = "block";

        //console.log(context);
        console.log(context.activeTab.assetSelection[0].metadata.mimeType);

        const SupportType = [
            "text/plain",
            "text/csv",
            "text/css",
            "text/javascript",
            "application/json",
        ];

        if (SupportType.includes(context.activeTab.assetSelection[0].metadata.mimeType)) {
            let selected = context.activeTab.assetSelection[0].originalUrl;
            let request = await fetch(selected, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            })
            let result = await request.text();
            //console.log(result);

            // If JSON, stringify and parse the result, else just display content of the file
            if (context.activeTab.assetSelection[0].metadata.mimeType === "application/json") {
                document.getElementById("quick").innerHTML = JSON.stringify(JSON.parse(result), null, 2);
            } else {
                document.getElementById("quick").innerHTML = result;
            }

        } else {
            document.getElementById("quick").innerHTML = "Unsupported file type<br>Text files only";
        }

        console.log('<<< init()');
    } catch (error) {
        console.log(error);
    }
}



// The DOMContentLoaded event is fired when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading
// The load event can be used to detect a fully - loaded page).
//document.addEventListener('DOMContentLoaded', init);
document.addEventListener('load', init)
