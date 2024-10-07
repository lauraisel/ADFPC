describe("Visit and download datasets for cancer", () => {
  const baseURL = "https://xenabrowser.net/datapages/";
  const tcgaHub =
    "?host=https%3A%2F%2Ftcga.xenahubs.net&removeHub=https%3A%2F%2Fxena.treehouse.gi.ucsc.edu%3A443";

  before(() => {
    cy.visit(`${baseURL}${tcgaHub}`);
  });

  it("Visit and download .gz files", () => {
    cy.get("ul.Datapages-module__list___2yM9o li a").each(($link) => {
      const href = $link.attr("href");
      const invalidHrefOne =
        "?cohort=TCGA%20Formalin%20Fixed%20Paraffin-Embedded%20Pilot%20Phase%20II%20(FPPP)&removeHub=https%3A%2F%2Fxena.treehouse.gi.ucsc.edu%3A443";
      const invalidHrefTwo =
        "?cohort=TCGA%20Pan-Cancer%20(PANCAN)&removeHub=https%3A%2F%2Fxena.treehouse.gi.ucsc.edu%3A443";

      cy.log("LOG:  " + href);

      if (href !== invalidHrefOne && href !== invalidHrefTwo) {
        cy.visit(`${baseURL}${href}`);

      
        cy.contains("h3", "gene expression RNAseq")
          .should("exist")
          .then(() => {
            cy.contains("a", "IlluminaHiSeq").then(($illuminaLink) => {
              const illuminaHref = $illuminaLink.attr("href");
              cy.visit(`${baseURL}${illuminaHref}`); 
              cy.get("a").each(($a) => {
                const linkHref = $a.attr("href");
                if (linkHref && linkHref.endsWith(".gz")) {
                  cy.wrap($a).click(); 
                }
              });
            });
          });
      }
    });
  });
});
