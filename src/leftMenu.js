class Menu {
    itemTemplate = document.querySelector("#menu-item-template");
    itemList = [];

    addCompany(ticker, company){
        let itemTemplate = this.itemTemplate;
        let newItemMenu = itemTemplate.cloneNode(true);

        newItemMenu.removeAttribute('id');
        newItemMenu.removeAttribute('style');

        newItemMenu.querySelector('.ticker-name').innerText = ticker;
        newItemMenu.querySelector('.ticker-company').innerText = company;

        this.itemList.push({'company': company, 'ticker': ticker});

        return document.querySelector(".left-menu .collection").appendChild(newItemMenu);
    }
}