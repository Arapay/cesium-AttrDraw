import { Component, OnInit ,OnDestroy} from '@angular/core';
import {SendDataService} from '../service/send-data.service'
declare var Cesium: {
  HorizontalOrigin: any;
  NearFarScalar: any;
  LabelStyle: any;
  PolylineDashMaterialProperty: any;
  GeometryInstance: any;
  SimplePolylineGeometry: any;
  defined: any;
  CallbackProperty: any;
  HeightReference: any;
  Color: any;
  Cartesian3: any;
  Entity: any;
  ScreenSpaceEventHandler: any;
  Math: any;
  Cartographic: any;
  ScreenSpaceEventType: any; Viewer: new (arg0: string) => any; 
};

var location = {
  latitude: 0,
  longitude: 0,
  height: 0,
  endPosition: null,
  cartesian : null
  };

  var labelSet_c={
    val01:true,
    val02:true,
    pixelSize:10,
    color:'#f2de68',
    alpha:80,
    outlineColor:'#FFFFFF',
    outlineWidth:5,
    type:true
  }
  // var viewer = new Cesium.Viewer('cc')
@Component({
  selector: 'app-cesium',
  templateUrl: './cesium.component.html',
  styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent implements OnInit ,OnDestroy{
  sub: any;
  // public viewer: Cesium.Viewer;
  public viewer:any ;
  constructor(private messageService: SendDataService
    ) {
    
   }
  public  sendMessage( ) {
    this.messageService.messageAction(JSON.stringify(location));
  }

  ngOnInit(): void {
    this.viewer= new Cesium.Viewer('cc')
//接收参数
    var labelSet_d = JSON.parse(JSON.stringify(labelSet_c));
    this.sub = this.messageService.message$.subscribe(res => 
      { labelSet_d = JSON.parse(res)
        if(labelSet_d.type){labelSet_c = labelSet_d}
        // console.log('labelSet_d:'+JSON.stringify(labelSet_d))
      });

//记录点击位置
    // const viewer = new Cesium.Viewer('cc')
    // var that=this;
    // this.viewer.screenSpaceEventHandler.setInputAction(function onLeftClick( movement: { position: any; }) {
    this.viewer.screenSpaceEventHandler.setInputAction(( movement: { position: any; })=> {
      var cartesian = this.viewer.scene.pickPosition(movement.position);
      location.cartesian = cartesian;
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      location.latitude = Cesium.Math.toDegrees(cartographic.latitude);
      location.longitude = Cesium.Math.toDegrees(cartographic.longitude);
      location.height = cartographic.height;
  },Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //关闭地形不偏移
    this.viewer.scene.globe.depthTestAgainstTerrain = true;
    let dian=document.getElementById('cc') as Element
    
//标点
    var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        handler.setInputAction((movement: any) => {
          // console.log(labelSet_c.color  )
            console.log('labelSet_c:'+JSON.stringify(labelSet_c)   )
            var label = {
                position : Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude,location.height),
                name : 'cc',
                point:{
                    pixelSize: labelSet_c.pixelSize,
                    color: Cesium.Color.fromCssColorString(labelSet_c.color).withAlpha(labelSet_c.alpha/100),
                    outlineColor: Cesium.Color.fromCssColorString(labelSet_c.outlineColor),
                    outlineWidth: labelSet_c.outlineWidth,
                    disableDepthTestDistance: 99000000,//Number.POSITIVE_INFINITY
                    heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
                    pixelOffset:new Cesium.Cartesian3(10,0),           //偏移
                    show: true
                }
            }; 
            this.viewer.entities.add(label);
              // handler.destroy();
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  //拾起标点
      var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

      handler.setInputAction( (movement: { position: any; })=> {

          var pick = this.viewer.scene.pick(movement.position);

          if (Cesium.defined(pick) ) {
            pick.primitive=Cesium.Color.YELLOW
              console.log('viewer.entities:')
              console.log(this.viewer.entities)
              console.log('pick:')
              console.log(pick)
              console.log('pick.id:')
              console.log(pick.id)
              
          

          }

      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); //不要忘记取消订阅
  }

}
