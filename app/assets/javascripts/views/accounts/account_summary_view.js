
MyMoney.Views.AccountSummaryView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
	template: "accounts/account_summary",

  events: {
    "click #go_back": "goBack",
  },

  initialize: function(){
    this.accountSubView = new MyMoney.Views.AccountShowView({model: this.model});
    this.statsSubView = new MyMoney.Views.AccountStatsView({model: this.model});
    this.listenTo(this.accountSubView, "editAccount", this.editAccount);
  },

  addAccountView: function(){
      this.$el.find('#panel1').html(this.accountSubView.render().el);
  },

  addStatsView: function(){
      this.$el.find('#panel2').html(this.statsSubView.render().el);
  },

  render: function() {
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    this.addAccountView();
    this.addStatsView();
    return this;
  },

  goBack: function(e) {
    window.router.navigate('accounts', {trigger: true});
  },

  editAccount: function() {
    this.accountSubView.remove();
    this.accountSubView = new MyMoney.Views.AccountEditView({model: this.model});
    this.listenTo(this.accountSubView, "doneEditing", this.doneEditing);
    this.listenTo(this.model, "destroy", this.goBack);
    this.addAccountView();
  },

  doneEditing: function() {
    this.accountSubView.remove();
    this.accountSubView = new MyMoney.Views.AccountShowView({model: this.model});
    this.listenTo(this.accountSubView, "editAccount", this.editAccount);
    this.addAccountView();
  }

});