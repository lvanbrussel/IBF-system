import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.scss'],
})
export class LogosComponent implements OnInit {
  private countrySubscription: Subscription;
  public logos: string[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countrySubscription = this.countryService
      .getCountrySubscription()
      .subscribe((country) => {
        if (country) {
          this.logos = country.countryLogos;
        }
      });
  }

  ngOnDestroy() {
    this.countrySubscription.unsubscribe();
  }
}
