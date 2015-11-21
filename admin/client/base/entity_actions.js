export default class EntityActions {

  updateEntities(entities) {
    this.dispatch(entities);
  }

  fetchEntities() {
    if(!this.Collection) throw 'this.Collection is not set.';

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

  entitiesFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}
