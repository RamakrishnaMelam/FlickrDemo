import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photos } from "../../app.model";
import { SearchService } from "../../services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInProgress: boolean = false;
  searchForm: FormGroup;
  searchText = '';
  result: Photos[];
  API_KEY: string = '0e4fd5922b4c35bed51c7bff86df720f';
  @Output() onCountrySearch = new EventEmitter();

  constructor(private fb: FormBuilder,
    private _searchService: SearchService) {
    this.searchForm = fb.group({
      'searchFlickr': [null, Validators.required],
      'validate': ''
    });
  }

  ngOnInit() {
  }
  searchFlickr(posts) {
    console.log(posts.searchFlickr);
    this.searchText = posts.searchFlickr
    this.searchInProgress = true;
    this._searchService.searchPhotos(this.searchText, this.API_KEY)
      .subscribe(data => {
        console.log(data);
        if (data.length == 0) {
          console.log('no photos matched your search query.');
        }
        this.result = data;
      }
      , Error => { console.log(Error); },
      () => {
        console.log('Flickr search complete');
        this.searchInProgress = false;
      }
      );
    console.log(this.result);
  }
  onSearch() {
    if (this.searchForm.valid) {
      this.onCountrySearch.emit({ searchCountry: this.searchForm.get('searchCountry').value });
    }
  }
}
