import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Comment} from "../Comment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseURL = 'http://mike19.pythonanywhere.com/'
  constructor(private http : HttpClient, private cookieService : CookieService) { }

  getComment(id : number) : Observable<Comment[]>{
    const url = this.baseURL + 'api/comments/search?id=' + id;
    return this.http.get<Comment[]>(url);
  }

  getComments() : Observable<Comment[]>{
    const url = this.baseURL + 'api/comments/all';
    return this.http.get<Comment[]>(url)
  }

  createComment(comment : Comment): Observable<any>{
    const url = this.baseURL + 'api/create/comment';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.post(url, comment, httpOptions);
  }

  updateComment(comment: Comment): Observable<any>{
    const url = this.baseURL + 'api/update/comment';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.put(url, comment, httpOptions);
  }

  deleteComment(comment: Comment): Observable<any>{
    const url = this.baseURL + 'api/delete/comment/' + comment.id;
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.delete<Comment>(url, httpOptions);
  }
}
