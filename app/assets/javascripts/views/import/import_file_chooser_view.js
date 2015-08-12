MyMoney.Views.ImportFileChooserView = MyMoney.Views.BaseView.extend({

  template: 'import/import_file_chooser',

  events: {
    'click #open_file': 'openFileChooser',
    'change #file_name' : 'updateFileName',
    'click #uploadOFX' : 'uploadOFX',
    'click #cancel' : 'cancel'
  },

  initialize: function(options){
    this.account = this.options.account;
    this.bankStatements = this.options.bankStatements;
    _.bindAll(this); 
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({account: this.account.toJSON()}));
    this.addSubView('import-history', new MyMoney.Views.BankStatementsTableView({
      account: this.account,
      collection: this.bankStatements
    }));
    this.renderSubViews();
    return this;
  },

  openFileChooser: function(e) {
    e.stopPropagation();
    this.$el.find('#file_name').trigger('click');
  },

  updateFileName: function(e) {
    var fileName = this.$('#file_name').val();
    this.$('#show_file').html(fileName);
    this.model.set('file_name', fileName);
  },

  fileIsSelected: function() {
    if (this.model.get('file_name')) {
      return true;
    }
    var $group = this.$('#file_name').closest('.form-group');
    $group.addClass('has-error');
    $group.find('.help-block').html('Please provide a file name.').removeClass('hidden');
    return false;
  },

  formData: function(){
    var data = new FormData();
    data.append('data_file', this.$('input[id="file_name"]')[0].files[0]);
    return data;
  },

  uploadOFX: function() {
    if (this.fileIsSelected()) {
      this.collection.uploadOFX(this.formData(), this.success);
    }
  },

  success: function(data){
    this.collection.reset(data.transactions);
  },

  cancel: function(){
    this.navigateToTransactions();
  },

  navigateToTransactions: function(){
    window.router.navigate('accounts/' + this.account.id + '/transactions', {trigger: true});
  }
});
