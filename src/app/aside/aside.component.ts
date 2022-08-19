import { Component, OnInit , OnDestroy,OnChanges, SimpleChanges, Input} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import {SendDataService} from '../service/send-data.service'

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})





export class AsideComponent implements OnInit, OnDestroy,OnChanges {

  aloc!: string;
  sub!: Subscription;
  public  obj_aloc={
    latitude: 0,
    longitude: 0,
    height: 0,
    endPosition: null,
    cartesian : null
  }
  public labelSet={
    val01:true,
    val02:true,
    pixelSize:10,
    color:'#f2de68',
    alpha:80,
    outlineColor:'#FFFFFF',
    outlineWidth:5,
    type:true
  }
  
  public  asendMessage( ) {
    this.messageService.messageAction(JSON.stringify(this.labelSet));
  }
//监听dom操作
  onSearchChange(result: string): void {
    console.log('result:'+result)
    this.asendMessage()
    
  }



  ngOnInit(): void {
    


    this.sub = this.messageService.message$.subscribe(action => 
      {this.aloc = action
      this.obj_aloc = JSON.parse(this.aloc)});
    
  }
  ngOnChanges(changes: SimpleChanges): void {//要传来的值改变才运行、自己属性的改变不运行
    console.log('change:')
    console.log(this.aloc,changes)
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe(); //不要忘记取消订阅
  }
  constructor(private messageService: SendDataService) { }
}
