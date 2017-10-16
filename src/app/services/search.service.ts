import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Photo, Photos } from "../app.model";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }
  searchResult: Photo[];

  // Fetch all existing photos based on filter
    /* istanbul ignore next */
    searchPhotos(request: string, key: string): Observable<Photos[]> {
      
              //.. flikr URL with filter.
              const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&&api_key=' + key + '&text=' + request + '&format=json&nojsoncallback=1';
      
              // ...using get request
              return this.http.get(url)
                  // ...and calling .json() on the response to return data
                  .map((res: Response) => {
                      const result = res.json();
                      if(result.stat !== 'ok'){
                          // throw errow
                          Observable.throw(result.stat || 'Server error');
                      }
                      //return photos collection.
                      return <Photos[]>result.photos
                  })
                  //...errors if any
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
          }
      
          /* istanbul ignore next */
          handleError(error: Response) {
              return Observable.throw({
                  status: error.status,
                  statusText: error.statusText,
                  message: 'error'
              });
          }

}
