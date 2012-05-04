module ImagesHelper

	def data_link_for_image_tagging(image_id)
		current_user.admin? ? edit_image_url(image_id) : ""
	end

end