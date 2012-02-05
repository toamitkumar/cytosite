class ImageFile
  TEMP_DIRECTORY = "tmp/"

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

  def self.url_to_image(image_id, format)
    "#{s3_base_url}/#{image_id}.#{format}"
  end

  def self.url_to_thumbnail(image_id, format)
    "#{s3_base_url}/#{image_id}_thumbnail.#{format}"
  end

  def self.save_with_thumbnail(upload, image_id, format)
    file_path = File.join(TEMP_DIRECTORY, image_id.to_s + '.' + format)
    thumbnail_path = File.join(TEMP_DIRECTORY, image_id.to_s + '_thumbnail.' + format)

    File.open(file_path, "wb") {|f| f.write(upload['datafile'].read)}
    ImageScience.with_image(file_path) do |image|
      image.thumbnail(200) {|new_img| new_img.save(thumbnail_path)}
    end

    push_to_s3(file_path, thumbnail_path)    
  end

  def self.push_to_s3(file_path, thumbnail_path)
    connect_to_aws

    AWS::S3::S3Object.store(File.basename(file_path), 
      open(file_path), 
      s3_bucket, 
      :access => :public_read)

    AWS::S3::S3Object.store(File.basename(thumbnail_path), 
      open(thumbnail_path), 
      s3_bucket, 
      :access => :public_read)

    AWS::S3::Base.disconnect
  end

  def self.connect_to_aws
    AWS::S3::Base.establish_connection!(
      :access_key_id => s3_access_key,
      :secret_access_key => s3_secret_access_key
    )
  end

  private
    def self.s3_access_key
      S3_CONFIG["access_key_id"]
    end

    def self.s3_secret_access_key
      S3_CONFIG["secret_access_key"]
    end

    def self.s3_bucket
      S3_CONFIG["bucket"]
    end

    def self.s3_base_url
      S3_CONFIG["base_url"]
    end
end