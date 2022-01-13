import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { Subject, BehaviorSubject, throwError, Observable, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

import { environment } from 'src/environments/environment';

export class TeamLevelAllDataService {

    constructor (private http: HttpClient, private apiService: HttpServiceService, private dataService: SharedDataService) {}

    userMilestonesAllSubscription:Subscription;
    userListSubscription:Subscription;
    userKpiSubscription:Subscription;
    dataAccessUserListSubscription:Subscription;
    userHierarchyListSubscription:Subscription;

    imgUrl:string = environment.imgUrl;

    private userMilestonesAllDataSource = new Subject();
    public userMilestonesAllData = this.userMilestonesAllDataSource.asObservable();

    private userListDataSource = new Subject();
    public userListData = this.userListDataSource.asObservable();

    private userKpiDataSource = new Subject();
    public userKpiData = this.userKpiDataSource.asObservable();

    private dataAccessUserListDataSource = new BehaviorSubject(null);
    public dataAccessUserListdata = this.dataAccessUserListDataSource.asObservable();

    private displayUserAccessUserDataSource = new BehaviorSubject(false);
    public displayUserAccessUserData = this.displayUserAccessUserDataSource.asObservable();

    getUserMilestonesAll(uID:string,driverID:string):void {
        var data:any = [];
        this.userMilestonesAllSubscription = this.apiService.get(`/v1/userMilestoneAll?uID=${uID}&driverID=${driverID}`).subscribe(response => {
            for (const key in response.payload) {
                if (response.payload[key].charpStatus!='D'){
                    data.push({
                        ID: parseInt(key)+1,
                        Milestone: response.payload[key].achieveText,
                        "Due Date": response.payload[key].dueDate,
                        KPI: response.payload[key].Kpi.objective,
                        kpiId: response.payload[key].Kpi.kpiID,
                        Status: response.payload[key].charpStatus,
                        User: response.payload[key].User.name + ' ' + response.payload[key].User.lname,
                        uID: response.payload[key].User.uID,
                        mileID: response.payload[key].mileID,
                        recurringFrequency: response.payload[key].recurringFrequency,
                        note: response.payload[key].milestoneNote,
                        qkaID: response.payload[key].QuarterKpiAssigns[0].qkaID,
                        qsID: response.payload[key].QuarterKpiAssigns[0].qsID
                    })    
                }
            }
        this.userMilestonesAllDataSource.next(data);
        });
    }

    getUserList(orgID:string): void {
        var data:any = [];
        this.userListSubscription = this.apiService.get(`/v1/organizationComplete?orgID=${orgID}`).subscribe(response=>{
            for (const key in response.payload) {
                for (const i in response.payload[key].Departments){
                    for (const j in response.payload[key].Departments[i].Roles){
                        for (const k in response.payload[key].Departments[i].Roles[j].Users){
                            data.push({
                                Email: response.payload[key].Departments[i].Roles[j].Users[k].email,
                                User: response.payload[key].Departments[i].Roles[j].Users[k].name + ' ' + response.payload[key].Departments[i].Roles[j].Users[k].lname,
                                uID: response.payload[key].Departments[i].Roles[j].Users[k].uID,
                                imageUrl: response.payload[key].Departments[i].Roles[j].Users[k].info 
                                    && response.payload[key].Departments[i].Roles[j].Users[k].info.photo.length>1 
                                    ? this.imgUrl + response.payload[key].Departments[i].Roles[j].Users[k].info.photo 
                                    : null
                            })
                        }
                    }
                }
            }
            this.userListDataSource.next(data);
        })
    }

    async getDataAccessUserList(uID:string) {
        var data:any = [];
        var dedupData:any = [];
        var element:object = {};
        var d:boolean = false;
        const grantedData = await this.apiService.get(`/v1/userGrantedDataAccess?uID=${uID}`).toPromise();

        for (const k in grantedData.payload){
            element = { User: grantedData.payload[k]['Grantor.name'] + ' ' + grantedData.payload[k]['Grantor.lname'],uID: grantedData.payload[k]['Grantor.uID'],imageUrl: grantedData.payload[k]['Grantor.info'] && grantedData.payload[k]['Grantor.info'].photo.length>0 ? this.imgUrl + grantedData.payload[k]['Grantor.info']['photo'] : null }
            data.push(element);
        }

        const hierarchyData = await this.apiService.get(`/v1/getUserHierarchy?uID=${uID}`).toPromise();

        for (const i in hierarchyData.payload){
            element = { User: hierarchyData.payload[i]['name'] + ' ' + hierarchyData.payload[i]['lname'],uID: hierarchyData.payload[i]['uID'],imageUrl: hierarchyData.payload[i]['info'] && hierarchyData.payload[i]['info']['photo'].length>0 ? this.imgUrl + hierarchyData.payload[i]['info']['photo'] : null }
            data.push(element);
        }

        const userList = await this.apiService.get(`/v1/getUserList?uID=${uID}&level=MinusOne`).toPromise();
        for (const i in userList.payload){
            element = { User: userList.payload[i]['name'] + ' ' + userList.payload[i]['lname'],uID: userList.payload[i]['uID'],imageUrl: userList.payload[i]['info'] && userList.payload[i]['info']['photo'].length>0 ? this.imgUrl + userList.payload[i]['info']['photo'] : null }
            data.push(element);
        }
        
        for(const x in data){
            d = false;
            for(const i in dedupData){
                if (data[x].User==dedupData[i].User){
                    d = true;
                }
            }
            if(!d){
                dedupData.push(data[x]);
            }
        }
        this.dataAccessUserListDataSource.next(dedupData);
    }

    getUserKpis(uID:string,driverID:string): any {
        var data:any = [];
        
        this.userKpiSubscription = this.apiService.get(`/v1/getUserKpi?uID=${uID}&driverID=${driverID}`).subscribe(response => {
            for (const key in response.kpis) {
                data.push({
                    ID: parseInt(key)+1,
                    KPI: response.kpis[key].objective,
                    Target: response.kpis[key].qty,
                    Unit: response.kpis[key].unit,
                    Actual: response.kpis[key].achieveQty,
                    kpiID: response.kpis[key].kpiID
                });
            }
            this.userKpiDataSource.next(data);
            }
        );
    }

    showUserDataAccessData(isDisplay:boolean): void{
        this.displayUserAccessUserDataSource.next(isDisplay);
    }

    ngOnDestroy():void {
        this.destroySubscriptions();
    }

    destroySubscriptions():void {
        this.userMilestonesAllSubscription ? this.userMilestonesAllSubscription.unsubscribe() : null;
        this.userListSubscription ? this.userListSubscription.unsubscribe() : null;
        this.userKpiSubscription ? this.userKpiSubscription.unsubscribe() : null;
        this.dataAccessUserListSubscription ? this.dataAccessUserListSubscription.unsubscribe() : null;
        this.userHierarchyListSubscription ? this.userHierarchyListSubscription.unsubscribe() : null;
    }
}