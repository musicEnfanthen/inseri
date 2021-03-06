import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService {

  private static API_BASE_URL_USERGROUP = environment.node + '/api/usergroups';

  constructor(private http: HttpClient) {
  }

  createGroup(title: string, description: string): Observable<any> {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP}`,
      {title: title, description: description}, {observe: 'response'});
  }

  getAllUserGroups() {
    return this.http.get(
      `${UsergroupService.API_BASE_URL_USERGROUP}`, {observe: 'response'});
  }

  showGroupMembers(title: string) {
    return this.http.get(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/' + title + '/listGroupMembers'}`, {observe: 'response'});
  }

  assignUserToGroup(group: any, email: string): Observable<any> {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/addMember'}`,
      {groupId: group._id, memberToAdd: email}, {observe: 'response'});
  }

  deleteGroup(groupTitle: string) {
    return this.http.post(
      'http://localhost:3000/api/userGroups/' + groupTitle,
      {title: groupTitle}, {observe: 'response'});
  }

  removeUserFromGroup(group: any, email: string): Observable<any> {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/removeMember'}`,
      {groupId: group._id, memberToRemove: email}, {observe: 'response'});
  }

  removeCurrentUserFromGroup(group: any) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/removeCurrentUserFromGroup/' + group._id}`,
      {title: group.title}, {observe: 'response'}
    );
  }

  assignNewOwner(group: any, email: string): Observable<any> {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/assignNewOwner/' + group._id + '&' + email}`,
      {title: group.title}, {observe: 'response'});
  }

  updateUserGroupDetails(groupId: string, title: string, description: string) {
    return this.http.post(
      `${UsergroupService.API_BASE_URL_USERGROUP + '/updateUserGroup/' + title + '&' + description}`,
      {groupId: groupId}, {observe: 'response'});
  }
  showUserGroupDetails(groupId: string) {
    return this.http.get(`${UsergroupService.API_BASE_URL_USERGROUP + '/showUserGroupDetails/' + groupId}`,
      {observe: 'response'}
      );
  }
}
