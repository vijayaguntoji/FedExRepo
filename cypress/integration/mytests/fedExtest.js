const url = "https://www.fedex.com/en-nl/home.html";
const greatBritanTitle = `Express Delivery, Courier & Shipping Services | FedEx United Kingdom`;
const fedExObjs = require("../../pages/fedEx");
let cookiesObj = `.fxg-button--orange.js-fxg-cookie-save.is-save-all`;
const assert = require('chai').assert

describe("auto practice features", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("should select the Great Britan English", () => {
    cy.get(`a[data-country-code="gb"]`).click();
    cy.get(cookiesObj).click();
    cy.get(`span[role=button]`).click();
    if(assert.exists(cy.get(`span[role=button]`))) cy.get(`span[role=button]`).click();
    cy.title().should("eq", greatBritanTitle);
    cy.url().should("eq", url);
  });

  it("should navigate to country list page", () => {
    fedExObjs.searchAndSelectCountry();
    cy.get(`input[name=trackingnumber]`).should("be.visible");
  });

  it("should validate the Tracking Page", () => {
    fedExObjs.navigateToHomePage();
    cy.get(`input[name=trackingnumber]`).should("be.visible");
  });

  it("should validate the other objects", () => {
    fedExObjs.navigateToHomePage();
    cy.get("span[aria-label='Get Rate and Shipping Details']").click();
  });

  it("Should navigate to Tracking Page and validate the Tracking ID", ()=> {
    fedExObjs.navigateToHomePage();
    fedExObjs.searchWithTrackingId("TestTrackingId");
  })

  it("Should navigate to Customize Tracking ID and validate the Page", ()=> {
    fedExObjs.navigateToHomePage();
    fedExObjs.customizedFedExTracking();
  })

  it("should open an account", () => {
    fedExObjs.navigateToHomePage();
    fedExObjs.navigateToAcountPage();
  });

  it.only("should launch the Ship with Account", ()=>{
    fedExObjs.navigateToHomePage();
    fedExObjs.navigateToShipWithAccount();
  });

  it.only("should launch the Ship without Account", ()=>{
    fedExObjs.navigateToHomePage();
    fedExObjs.navigateToShipWithoutAccount();
  });

});
