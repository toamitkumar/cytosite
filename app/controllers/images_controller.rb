class ImagesController < ApplicationController
  def tags
    render :text => '[{"ID":1,"LEFT":"30.23952095808383","TOP":"32.6","WIDTH":"46.10778443113772","HEIGHT":"31.6","DATE":{"Y":"2010","M":"04","D":"30","H":"12","I":"55"},"NOTE":"visit Flickr","AUTHOR":"Lukas","LINK":"http:\/\/www.flickr.com\/photos\/lugat\/"}]'
  end
end