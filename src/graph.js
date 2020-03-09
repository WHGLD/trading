class Graph {
    graphTemplate = document.querySelector("#graph-template");
    graphList = [];

    create (ticker, company){
        let container = this._prepareContainer(ticker);
        let widgetContainedId = container.querySelector(".tradingview_widget").id;

        this.graphList.push({
            'tiker' : ticker,
            'company' : company,
            'container': container
        });

        this._initWidget(ticker, company, widgetContainedId);

        let closeBtn = container.querySelector('.close-btn');
        closeBtn.addEventListener('click', function () {
            container.remove();
        });
    }

    deleteAll (){
        this.graphList.forEach(function (element) {
            element.container.remove();
        });
        this.graphList = [];
    }

    deleteByTicker (ticker){
        this.graphList.map(function (val, index) {
            console.log('val ', val, 'index ', index);
        })
    }

    _prepareContainer (ticker) {
        let graphTemplate = this.graphTemplate;
        let newGraph = graphTemplate.cloneNode(true);
        let nextIndex = +graphTemplate.getAttribute('data-index') + 1;
        let widgetContainer = newGraph.querySelector(".tradingview_widget");

        graphTemplate.setAttribute("data-index", nextIndex);
        newGraph.removeAttribute('id');
        newGraph.removeAttribute('style');
        newGraph.setAttribute("data-ticker", ticker);
        widgetContainer.setAttribute("id", "widget_"+nextIndex);

        return document.querySelector(".graph-wrapper").appendChild(newGraph);
    }

    _initWidget (ticker, company, containerId) {
        new TradingView.MediumWidget(
            {
                "container_id": containerId,
                "symbols": [
                    [
                        company,
                        ticker+"|1d"
                    ]
                ],
                "gridLineColor": "#e9e9ea",
                "fontColor": "#83888D",
                "underLineColor": "#dbeffb",
                "trendLineColor": "#4bafe9",
                "width": "600px",
                "height": "400px",
                "locale": "ru"
            }
        );
    }
}