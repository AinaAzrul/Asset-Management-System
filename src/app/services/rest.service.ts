import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {  

  private url = "http://localhost/rdma_web/api.php";
  // private url = "http://localhost/rdma_web/master/read.php";
  
  constructor(private httpClient: HttpClient) { }

  // Method exports
   getPosts(method, token = null, data = null) {
    return this.httpClient.post(
      this.url,
        {
          method: method,
          token: token,
          data: data
        });
  }

}


