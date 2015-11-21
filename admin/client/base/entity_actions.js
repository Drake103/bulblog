export default class EntityActions {

  static updateEntities(entities) {
    console.log(entities);
    this.dispatch(entities);
  }

  static fetchEntities() {
    if (!this.Collection) throw 'this.Collection is not set.';

    this.dispatch();

    let collection = new this.Collection();
    collection.fetch()
      .then((entities) => {
        this.actions.updateEntities(entities);
      })
      .catch((errorMessage) => {
        this.actions.entitiesFailed(errorMessage);
      });
  }

  static entitiesFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}
