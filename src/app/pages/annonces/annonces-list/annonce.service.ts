import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Annonce, SearchResult } from './annonce.model';
import { SortDirection } from './annonce-sortable.directive';
import {
    Firestore, addDoc, collection, collectionData,
    doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
  } from '@angular/fire/firestore';

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

/**
 * Sort the table data
 * @param tabless Annonce field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(annonces: Annonce[], column: string, direction: string): Annonce[] {
    if (direction === '' || column === '') {
        return annonces;
    } else {
        return [...annonces].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Annonce Data Match with Search input
 * @param annonces Annonce field value fetch
 * @param term Search the value
 */
function matches(annonce: Annonce, term: string, pipe: PipeTransform) {
    return annonce.titre.toLowerCase().includes(term.toLowerCase())
        || annonce.surface
        || annonce.description.toLowerCase().includes(term)
        || pipe.transform(annonce.prix).includes(term)
        || annonce.date
        || annonce.nbr_piece;
}

@Injectable({
    providedIn: 'root'
})

export class AnnonceService {
    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _annonces$ = new BehaviorSubject<Annonce[]>([]);
    // tslint:disable-next-line: variable-name
    private _total$ = new BehaviorSubject<number>(0);
    // tslint:disable-next-line: variable-name
    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 0,
        endIndex: 9,
        totalRecords: 0
    };
    annonces : Annonce[];

    constructor(private pipe: DecimalPipe, public afs:Firestore) {
        /*
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._annonces$.next(result.annonces);
            this._total$.next(result.total);
        });
        this._search$.next();
        */
        
    }

    getAnnonces(): Observable<Annonce[]>{
        const annonces = collection(this.afs, 'annonces');
       return collectionData(annonces, { idField: 'id' }) as Observable<Annonce[]>;
      }

    /**
     * Returns the value
     */
    get annonces$() { return this._annonces$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }

    /**
     * set the value
     */
    // tslint:disable-next-line: adjacent-overload-signatures
    set page(page: number) { this._set({ page }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    // tslint:disable-next-line: adjacent-overload-signatures
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    /**
     * Search Method
     */
    
    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let annonces = sort(this.annonces, sortColumn, sortDirection);

        // 2. filter
        annonces = annonces.filter(table => matches(table, searchTerm, this.pipe));
        const total = annonces.length;

        // 3. paginate
        this.totalRecords = annonces.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        annonces = annonces.slice(this._state.startIndex - 1, this._state.endIndex);
        return of(
            { annonces, total }
        );
    }
    
}
