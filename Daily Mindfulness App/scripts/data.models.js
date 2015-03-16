var WorksheetEntryModel = kendo.data.Model.define({
  id: "Id",
  fields: {
    Id: {
      id: Everlive.idField,
      editable: false,
      nullable: true
    },
    CreatedAt: {
      editable: false,
      nullable: true
    },
    ModifiedAt: {
      editable: false,
      nullable: true
    },
    CreatedBy: {
      editable: false,
      nullable: true
    },
    ModifiedBy: {
      editable: false,
      nullable: true
    },
    Owner: {
      editable: false,
      nullable: true
    },
    Payload: {
      type: "text",
      validation: { required: true }
    },
    Dispute1: {
      type: "text",
      validation: { required: true }
    },
    Dispute2: {
      type: "text",
      validation: { required: true }
    },
    Dispute3: {
      type: "text",
      validation: { required: true }
    },
    Dispute4a: {
      type: "text",
      validation: { required: true }
    },
    Dispute4b: {
      type: "text",
      validation: { required: true }
    },
    Dispute4c: {
      type: "text",
      validation: { required: true }
    },
    BehavioralConsequence: {
      type: "text",
      validation: { required: true }
    },
    EmotionalConsequence: {
      type: "text",
      validation: { required: true }
    },
    BeliefSystem: {
      type: "text",
      validation: { required: true }
    },
    ActivatingEvent: {
      type: "text",
      validation: { required: true }
    },
    ChangeInBehavior: {
      type: "text",
      validation: { required: true }
    }
  }
});