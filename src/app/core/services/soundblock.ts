import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SoundblockService {
  constructor(private http: HttpClient) {}

  // Projects Section
  getUsersProjects(user) {
    return this.http
      .get('account/soundblock/projects', {
        params: {
          user,
          per_page: '10',
        },
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getUsersProject(user, project) {
    return this.http.get('account/soundblock/project', {
      params: {
        user,
        project,
      },
    });
  }

  // Services Section
  getUsersServices(user) {
    return this.http
      .get('account/soundblock/services', {
        params: {
          user,
          per_page: '10',
        },
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getUsersService(service) {
    return this.http.get(`account/soundblock/service/${service}`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getTransactions(service_uuid) {
    return this.http
      .get(`account/soundblock/service/${service_uuid}/transaction`)
      .pipe(
        map((res: any) => {
          return res.soundblock_services_transactions;
        })
      );
  }

  getServicePlan(service_uuid) {
    return this.http.get(`account/soundblock/service/${service_uuid}/plan`);
  }

  getServiceOwner(service_uuid) {
    return this.http.get(`account/soundblock/service/${service_uuid}/user`);
  }

  unsubscribeSection(service_uuid) {
    return this.http.delete(`account/user/service/${service_uuid}`);
  }
}
