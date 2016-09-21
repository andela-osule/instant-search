import { Component } from '@angular/core';
import { WikipediaSearchService } from './wikipedia-search.service';
import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [WikipediaSearchService],
})
export class AppComponent {
    items: Array<string>;
    term$ = new Subject<string>();
    constructor(private service: WikipediaSearchService) {
        this.term$
        .debounceTime(400)
        .distinctUntilChanged()
        .map(term => this.service.search(term))
        .subscribe(obsRes => obsRes.subscribe(
            results => this.items = results
        ));
    }
}