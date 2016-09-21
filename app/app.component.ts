import { Component } from '@angular/core';
import { WikipediaSearchService } from './wikipedia-search.service';
import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/map';


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
        this.term$.subscribe(term => this.search(term));
    }

    search(term: string) {
        this.service.search(term)
            .subscribe(results => this.items = results);
    }
}