import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conversao, ConversaoResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";

  constructor(private http: HttpClient) {}

  /**
   * Realiza a chamada para a API de conversão de moedas.
   * 
   * @param conversao Conversao
   * @returns Observable<ConversaoResponse>
   */
  converter(conversao: Conversao): Observable<ConversaoResponse> {
    let params = `&base=${conversao.moedaDeOrigem}&symbols=${conversao.moedaDeDestino}`;
    
    return this.http.get<ConversaoResponse>(this.BASE_URL + params);
  }
  
  /**
   * Retorna a cotação De Destino dado uma response
   * 
   * @param conversaoResponse Conversaoresponse
   * @param conversao Conversao
   * @returns number
   */
  cotacaoMoedaDeDestino(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (conversaoResponse === undefined) {

      return 0;
    }

    return conversaoResponse.rates[conversao.moedaDeDestino];
  }

  /**
   * Retorna a cotação De Origem dado uma response
   * 
   * @param conversaoResponse Conversaoresponse
   * @param conversao Conversao
   * @returns string
   */
  cotacaoMoedaDeOrigem(conversaoResponse: ConversaoResponse, conversao: Conversao): string {
    if (conversaoResponse === undefined) {

      return '0';
    }

    return (1 / conversaoResponse.rates[conversao.moedaDeDestino]).toFixed(4);
  }

  /**
   * Retorna a data da cotação dado uma response.
   * 
   * @param conversaoResponse ConversaoResponse
   * @returns string
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {

      return '';
    }

    return conversaoResponse.date;
  }
}
