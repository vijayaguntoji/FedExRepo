// import { get } from 'cypress/types/lodash';

const homePageUrl = `https://www.fedex.com/en-nl/home.html`
const countryListUrl = `https://www.fedex.com/global/choose-location.html?location=home`;
let cookiesObj = `.fxg-button--orange.js-fxg-cookie-save.is-save-all`
const assert = require('chai').assert;

let signUpLink =  `#fxg-dropdown-signIn span`;
let shippingLink = '#fxg-dropdown-signIn span';
let shipWithaccount = 'a[title=ship]';
let shipWithoutaccount = 'a[aria-label="Ship without account"]';
let trackingLink = 'div:nth-child(2) > li > a > span';
let trackingInput = 'input#trackingModuleTrackingNum';
let trackingButton = '.fxg-tracking-module form[method="POST"] button';
let customisedFedexTracking = 'a[aria-label="Customised FedEx Tracking"]';
let fedExTracking = '.fxg-align-left fxg-landing-hero-bg-heading';
let getVisibility = '.fxg-subtext:nth-child(1) p';
let accountLink = '.fxg-dropdown div.dropdown:nth-child(4) li a span';


export function searchAndSelectCountry(){
  cy.get(`.js-geo-global-url`).click();
  cy.url().should("eq", countryListUrl);
  cy.get(`a[href='${homePageUrl}']`).click();
  cy.get(`a[data-country-code="gb"]`).click();
  cy.get(cookiesObj).click();
  cy.get(`span[role=button]`).click();
  if(cy.get(`span[role=button]`).its('length') > 0 ) cy.get(`span[role=button]`).click();
  }

export function navigateToHomePage(){
  cy.get(`a[data-country-code="nl"]`).click();
  cy.get(cookiesObj).click();
  cy.get(`span[role=button]`).click();
  if(cy.get(`span[role=button]`).its('length') > 0 ) cy.get(`span[role=button]`).click();
}

export function searchWithTrackingId (TrackingID) {
  cy.get(trackingLink).click();
  cy.get(trackingInput).focus().type(TrackingID);
  cy.get(trackingButton).click();
}

export function customizedFedExTracking(){
  cy.get(trackingLink).click();
  cy.get(customisedFedexTracking).click();
  cy.get('body').then((body) => {
    if(body.find(`span.fxg-alert__close-btn`).length > 0) body.find(`span.fxg-alert__close-btn`).click();
  });
  cy.url().should("eq", "https://www.fedex.com/en-gb/tracking/advanced.html")
  cy.get(getVisibility).should("have.text", 'Get visibility and details on the status of your shipments - all in a fully customised format.');
}

export function navigateToAcountPage(){
  cy.get(accountLink).click();
}

export function navigateToShipWithAccount(){
  cy.get(shipWithaccount).click();
  cy.wait(2000);
  cy.url().should("eq", 'https://www.fedex.com/secure-login/en-nl/#/login-credentials');
  cy.title().should("include", "Login");
  cy.get(`h1`).should("include", "Enter your user ID and password to log in").should("be.visible");
}

export function navigateToShipWithoutAccount(){
  cy.get(shipWithoutaccount).click();
  cy.wait(2000);
  cy.url().should("eq", 'https://www.fedex.com/lite/lite-ship.html?locale=en_nl&cntry_code=nl_english#address');
  cy.get("#addressheader").should("be.visible");
  assert.isTrue(cy.get(".fxlay-full-section h3").should("have.text", `Enter your (From) address and the recipient's (To) address.`));
}

module.exports = {
  searchAndSelectCountry,
  navigateToHomePage,
  searchWithTrackingId,
  customizedFedExTracking,
  navigateToAcountPage,
  navigateToShipWithAccount,
  navigateToShipWithoutAccount
}
