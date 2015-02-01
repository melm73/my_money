
MyMoney.Views.AccountView = Backbone.View.extend({

  template: "accounts/account_row",
  tagName: "tr",

  events: {
    "click #show": "showAccount"
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  showAccount: function(e){
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/' + this.model.id + '/show', {trigger: true});
  }
});