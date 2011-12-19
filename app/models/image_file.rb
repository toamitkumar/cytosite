class ImageFile < ActiveRecord::Base
  UPLOAD_DIRECTORY = "public/images/cyto/"

  def self.save(upload, question_id, format)
    name = question_id.to_s + '.' + format
    path = File.join(UPLOAD_DIRECTORY, name)
    File.open(path, "wb") {|f| f.write(upload['datafile'].read)}
  end

  def self.save_thumbnail(question_id, format)
    file_name = question_id.to_s + '.' + format
    ImageScience.with_image(UPLOAD_DIRECTORY + file_name) do |image|
      image.thumbnail(200) {|new_img| new_img.save(UPLOAD_DIRECTORY + 'thumbnails/' + file_name)}
    end
  end

end