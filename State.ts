class State<T>{
    protected target: T;
    protected stateName: string;
    protected callBackObj: StateMachine<T>;
    public onEnterState() { };
    public onUpdate() { };
    public onExitState() { };
    public setTarget(target: T) {
        this.target = target;
    }
    public getStateName(): string {
        return this.stateName;
    }
    public changeToNextState() {
    }
}