import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WikipediaSearchService {
    constructor(private jsonp: Jsonp) {}

    search(terms: Observable<string>, debounceMs=400) {
        return terms.debounceTime(400)
                    .distinctUntilChanged()
                    .switchMap(term => this.rawsearch(term)) //throw away previous observable & subscribe to next
    }

    rawsearch(term: string) {
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');
        let obs =  this.jsonp.get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {search})
        .map(response => response.json()[1]);
        if (term.length === 2) {
            obs = obs.delay(100);
        } // simulate out of order response
        return obs
    }
}