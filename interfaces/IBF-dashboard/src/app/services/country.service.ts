import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from '../auth/auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countrySubject = new BehaviorSubject<Country>(null);
  public countries: Country[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {
    this.authService.getAuthSubscription().subscribe((user: User) => {
      this.getCountriesByUser(user);
    });
  }

  public async getCountriesByUser(user: User): Promise<void> {
    this.countries = await this.apiService.getCountries();
    this.filterCountriesByUser(user);
  }

  getCountrySubscription = (): Observable<Country> => {
    return this.countrySubject.asObservable();
  };

  public selectCountry = (countryCodeISO3: string): void => {
    this.countrySubject.next(
      this.countries.find(
        (country) => country.countryCodeISO3 == countryCodeISO3,
      ),
    );
  };

  public filterCountriesByUser(user: User): void {
    if (!user || !user.countries) {
      this.countries = [];
    } else {
      this.countries = this.countries.filter(
        (country) => user.countries.indexOf(country.countryCodeISO3) >= 0,
      );
      if (this.countries.length > 0) {
        this.selectCountry(this.countries[0].countryCodeISO3);
      }
    }
  }
}
