import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryLookupService } from './country-lookup.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'esali45-angular-app';

  countryLookupData: any = null;

  constructor(
    private countryService: CountryLookupService,
    private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const svgObject = document.getElementById("svgObject") as HTMLObjectElement;
    let tableHeader = document.getElementById("countryInfoHeader") as HTMLElement;
    let tableData = document.getElementById("countryInfoData") as HTMLElement;
    // Makes sure that svgObject is loaded into the DOM first via load
    svgObject.addEventListener("load", () => {
      // Checks if the content of the svgObject exists
      if (svgObject.contentDocument) {
        const svgDocument = svgObject.contentDocument;
        const svgPaths = svgDocument.querySelectorAll("path");
        // Loop for all svg paths via svgPaths
        svgPaths.forEach((path: SVGPathElement) => {
          // Saves the original svg path fill color to reuse
          const pathOriginalColor = path.style.fill;
          // Changes cursor to pointer on all svg paths
          path.style.cursor = "pointer";
          // Adds mouseover and mouseout event listeners for svg path. Handler changes path fill color
          path.addEventListener("mouseover", (event: MouseEvent) => {
            path.style.fill = "red";
          });
          path.addEventListener("mouseout", (event: MouseEvent) => {
            path.style.fill = pathOriginalColor;
          });
          // Changes country info table data based upon selected svg path
          path.addEventListener("click", (event: MouseEvent) => {
            const countryCode = path.getAttribute("id");
            if (countryCode) {
              this.getCountryDetails(countryCode);
            }
          });
        });
      }
    });
  }

// Retrieves country details from the selected country code from the service
// Updates countryLookupData as well
  getCountryDetails(countryCode: string) {
    this.countryService.getCountryData(countryCode).subscribe(response => {
      if (response[1] && response.length > 0) {
        // Updates countryLookupData with json info response from the api via the service file
        this.countryLookupData = response[1][0];
        // Forces change detection, had HTML table not updating unless I did a frame reload without detectChanges
        this.cdr.detectChanges();
      }
      else {
        console.log("Api error");
      }
    });
  }
}