import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from './url';
import { NotificationService } from './notification.service';

const SORT_FILTERS_KEY = 'sort_filters';
const FILTERS_KEY = 'filters';
export const headers = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': 'true',
});

@Injectable({
  providedIn: 'root',
})
export class SpaceMarineService {
  readonly pageMin = 1;

  private readonly _isOpenAddMarineDialog = new BehaviorSubject(false);
  readonly _isOpenAddMarineDialog$ = this._isOpenAddMarineDialog.asObservable();

  private readonly _isOpenGetMarineByIdDialog = new BehaviorSubject(false);
  readonly _isOpenGetMarineByIdDialog$ =
    this._isOpenGetMarineByIdDialog.asObservable();

  private readonly _sortFilters = new BehaviorSubject([]);
  readonly _sortFilters$ = this._sortFilters.asObservable();

  private readonly _patternMarine = new BehaviorSubject({});
  readonly _patternMarine$ = this._patternMarine.asObservable();

  private readonly _addMarine = new Subject<boolean>();
  readonly _addMarine$ = this._addMarine.asObservable();

  setAddMarine() {
    this._addMarine.next(true);
  }

  setPatternMarine(pattern: any) {
    this._patternMarine.next(pattern);
  }

  setSortFilters(filters: any) {
    this._sortFilters.next(filters);
  }

  saveSortFilters(filters: any) {
    if (filters) {
      window.localStorage.removeItem(SORT_FILTERS_KEY);
      window.localStorage.setItem(SORT_FILTERS_KEY, JSON.stringify(filters));
    }
  }

  loadSortFilters() {
    const sortFiltersData = window.localStorage.getItem(SORT_FILTERS_KEY);
    if (sortFiltersData) {
      return JSON.parse(sortFiltersData);
    }

    return [];
  }

  private readonly _Filters = new BehaviorSubject([]);
  readonly _Filters$ = this._Filters.asObservable();

  setFilters(filters: any) {
    this._Filters.next(filters);
  }

  saveFilters(filters: any) {
    if (filters) {
      window.localStorage.removeItem(FILTERS_KEY);
      window.localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
    }
  }

  loadFilters() {
    const FiltersData = window.localStorage.getItem(FILTERS_KEY);
    if (FiltersData) {
      return JSON.parse(FiltersData);
    }

    return [];
  }

  setIsOpenAddMarineDialog(flag: boolean) {
    this._isOpenAddMarineDialog.next(flag);
  }

  setIsOpenGetMarineByIdDialog(flag: boolean) {
    this._isOpenGetMarineByIdDialog.next(flag);
  }

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getMarines(id: number, sort_filters: any, filters: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', id);
    queryParams = queryParams.append('pageSize', 10);
    if (sort_filters) {
      sort_filters.forEach((item: any) => {
        queryParams = queryParams.append(
          'sort',
          `${item.name}=${item.sortDirection}`
        );
      });
    }

    if (filters) {
      filters.forEach((item: any) => {
        queryParams = queryParams.append(
          'filter',
          `${item.name}[${item.filter}]=${item.value}`
        );
      });
    }

    return this.http.get(`${URL}/spacemarines`, { params: queryParams }).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  addNewMarine(marine: any) {
    const marineDTO = this.postSpaceMarineDTO(marine);
    // console.log(marineDTO);
    // console.log(JSON.stringify(marineDTO));
    return this.http.post(`${URL}/spacemarines`, marineDTO, { headers }).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  getMarineById(id: number) {
    return this.http.get(`${URL}/spacemarines/${id}`).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  editMarine(marineId: number, marineData: any) {
    const marineDTO = this.postSpaceMarineDTO(marineData);
    return this.http
      .put(`${URL}/spacemarines/${marineId}`, marineDTO, {
        headers,
      })
      .pipe(
        catchError((error) => {
          this.notificationService.pushErrorNotification(
            error.error.message ? error.error.message : error.message,
            `${error.error.code ? error.error.code : error.status} code`
          );
          return throwError(error);
        })
      );
  }

  deleteMarine(marineId: number) {
    return this.http
      .delete(`${URL}/spacemarines/${marineId}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          this.notificationService.pushErrorNotification(
            error.error.message ? error.error.message : error.message,
            `${error.error.code ? error.error.code : error.status} code`
          );
          return throwError(error);
        })
      );
  }

  getLowerAchievs(achievs: string) {
    let params = new HttpParams();
    params = params.append('achieve', achievs);
    return this.http.get(`${URL}/spacemarines/lower-achieves`, { params }).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  getUniqueValueHeartCnt() {
    return this.http.get(`${URL}/spacemarines/unique/heart`).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  getPatternMarine(pattern: any) {
    let params = new HttpParams();
    params = params.append('field', pattern.field);
    params = params.append('value', pattern.value);

    return this.http.get(`${URL}/spacemarines/pattern`, { params }).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  private postSpaceMarineDTO(marineData: any) {
    return {
      name: marineData.name,
      coordinates: {
        x: marineData.x,
        y: marineData.y,
      },
      health: marineData.health,
      heartCount: marineData.heartCount,
      achievements: marineData.achievements,
      category: marineData.category,
      chapter: {
        name: marineData.chapterName,
        marinesCount: marineData.chapterMarinesCount,
      },
      starshipId: marineData.starshipId,
    };
  }
}
