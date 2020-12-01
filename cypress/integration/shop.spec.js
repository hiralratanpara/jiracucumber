/// <reference types='Cypress'/>
import { data } from "../fixtures/we/test-data.json";
import { searchPage, productPage, pipPage } from "../locators/we/pip.json";
import { category } from "../locators/we/shop.json";
import { breadcrumbs } from "../locators/we/pip.json";

describe("WE Test Shop Page ", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  before(() => {
    var region = Cypress.env("region");
    var urls = Cypress.env(region);
    var brand = Cypress.env("brand");
    var url = urls[brand];

    if (region.toUpperCase() === "PROD") {
      cy.visit(url);
    } else {
      cy.visit(url, {
        auth: {
          username: Cypress.env("username"),
          password: Cypress.env("password"),
        },
      });
    }

    cy.wait(5000);
    cy.get("body")
      .find(".stickyOverlayCloseButton")
      .its("length")
      .then((res) => {
        if (res > 0) {
          cy.get(".stickyOverlayCloseButton").click();
        }
      });
  });
  it("Should search SKU", () => {
    cy.get(searchPage.searchBox).type(data.homePageData.skuNo).submit();
  });

  it("Should load the sku", () => {
    cy.get(pipPage.productLabel).get("h1").contains(data.homePageData.skuName);
  });

  it("Should display the correct swatch", () => {
    cy.get(pipPage.swatchLabel).should(
      "have.text",
      data.homePageData.defaultSwatch
    );
  });

  it("should display visual navigation", () => {
    cy.get(category.superCat).click();
    cy.get(category.leftMenu).click();

    cy.get("body")
      .find(
        "#join-email-campaign > .shader > .modal-scroll > .modal_component > .btnClose"
      )
      .its("length")
      .then((res) => {
        if (res > 0) {
          cy.get(
            "#join-email-campaign > .shader > .modal-scroll > .modal_component > .btnClose"
          ).click();
        }
      });
    cy.wait(5000);
    cy.get(category.visualNav).should("be.visible");
    });
    it("should display the shop grid", () => {
     cy.get(category.shopGrid).should("be.visible");
    });

    it("should display the breadcrumb", () => {
      cy.get("#breadcrumbs").should("exist");
    });

    it("should display the correct values in the breadcrumb", () => {
      cy.get(breadcrumbs.firstBreadcrumb).should(
        "have.text",
        data.breadcrumb.firstBreadcrumbVal
      );
      cy.get(breadcrumbs.secondBreadcrumb).should(
        "have.text",
        data.breadcrumb.secondBreadcrumbVal
      );
      cy.get(breadcrumbs.thirdBreadcrumb).should(
        "have.text",
        data.breadcrumb.thirdBreadcrumbVal
      );
    });

    it("should display the correct values in the sub-cat-aside", () => {
      cy.get(category.FilterBySubcataside).should(
        "have.text",
        data.subCatAside.FilterBySubcataside
      );
      cy.get(category.AvailabilitySubcataside).should(
        "have.text",
        data.subCatAside.AvailabilitySubcataside
      );
      cy.get(category.MaterialSubcataside).should(
        "have.text",
        data.subCatAside.MaterialSubcataside
      );
      cy.get(category.LengthSubcataside).should(
        "have.text",
        data.subCatAside.LengthSubcataside
      );
      cy.get(category.ColorSubcataside).should(
        "have.text",
        data.subCatAside.ColorSubcataside
      );
      cy.get(category.SeatingCapacitySubcataside).should(
        "have.text",
        data.subCatAside.SeatingCapacitySubcataside
      );
     cy.get(category.SeatFirmnessSubcataside).should(
       "have.text",
       data.subCatAside.SeatFirmnessSubcataside
     );
     cy.get(category.FeaturesSubcataside).should(
       "have.text",
       data.subCatAside.FeaturesSubcataside
     );
     cy.get(category.PriceSubcataside).should(
       "have.text",
       data.subCatAside.PriceSubcataside
     );
    });

   it("should display 'SORT BY'", () => {
     cy.get(category.SortBy).should("be.visible");
    });
   it("should select down arrow",() => {
     cy.get(category.DownArrow).should("be.visible");
    });
   it("should select PriceLowToHIGH", () => {
     cy.get(category.PriceLowToHIGH).should("be.visible");
   });
   });

