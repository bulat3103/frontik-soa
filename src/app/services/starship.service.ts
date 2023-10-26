import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {STARSHIP_URL} from './url';
import {NotificationService} from './notification.service';
import {catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarShipService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
  }

  createSpaceShip(spaceShipData: any, name: string, id: number) {
    const body = this.postSpaceShipDTO(spaceShipData, id);

    return this.http.post(`${STARSHIP_URL}/starship/create/${id}/${name}`, body).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  unloadAllMarines(id: number) {
    return this.http.post(`${STARSHIP_URL}/starship/${id}/unload-all`, {}).pipe(
      catchError((error) => {
        this.notificationService.pushErrorNotification(
          error.error.message ? error.error.message : error.message,
          `${error.error.code ? error.error.code : error.status} code`
        );
        return throwError(error);
      })
    );
  }

  postSpaceShipDTO(spaceShipData: any, id: number) {
    return {
      id,
      name: spaceShipData.name,
      coordinates: {
        x: spaceShipData.x,
        y: spaceShipData.y,
      },
      crewCount: spaceShipData.crewCount,
      health: spaceShipData.health,
    };
  }
}
