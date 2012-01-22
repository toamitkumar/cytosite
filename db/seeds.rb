#Creating default users
User.destroy_all
User.create!(:email => 'samik2803@gmail.com', :name => 'Samik Pal', :password => 'P@ssw0rd', :password_confirmation => 'P@ssw0rd', :role => 'admin')
User.create!(:email => 'toamitkumar@gmail.com', :name => 'Amit Kumar', :password => 'P@ssw0rd', :password_confirmation => 'P@ssw0rd', :role => 'admin')
User.create!(:email => 'asaqi@hotmail.com', :name => 'Anjali Saqi', :password => 'P@ssw0rd', :password_confirmation => 'P@ssw0rd', :role => 'admin')

#Creating categories
Category.destroy_all
overview = Category.create(:name => "Overview", :code => "overview", :parent_id => nil, :level => "0", :sort_order => "1")
general = Category.create(:name => "General", :code => "general", :parent_id => overview.id, :level => "1", :sort_order => "2")
Category.create(:name => "Exfoliated cytology", :code => "exfoliated", :parent_id => general.id, :level => "2", :sort_order => "3")
Category.create(:name => "Fine needle aspiration cytology", :code => "needle", :parent_id => general.id, :level => "2", :sort_order => "4")
gyne = Category.create(:name => "Gynecological", :code => "gyne", :parent_id => overview.id, :level => "1", :sort_order => "5")
Category.create(:name => "Bethesda system", :code => "bethesda", :parent_id => gyne.id, :level => "2", :sort_order => "6")
Category.create(:name => "Management", :code => "mgmt", :parent_id => gyne.id, :level => "2", :sort_order => "7")
Category.create(:name => "Squamous lesions", :code => "squamous", :parent_id => gyne.id, :level => "2", :sort_order => "8")
Category.create(:name => "Glandular lesions", :code => "glandular", :parent_id => gyne.id, :level => "2", :sort_order => "9")
Category.create(:name => "Non neo-plastic findings", :code => "non_plastic", :parent_id => gyne.id, :level => "2", :sort_order => "10")
non_gyne = Category.create(:name => "Non Gynecological", :code => "non_gyne", :parent_id => overview.id, :level => "1", :sort_order => "11")
Category.create(:name => "Bone and soft tissue", :code => "bone", :parent_id => non_gyne.id, :level => "2", :sort_order => "12")
Category.create(:name => "Breast", :code => "breast", :parent_id => non_gyne.id, :level => "2", :sort_order => "13")
Category.create(:name => "CSF", :code => "csf", :parent_id => non_gyne.id, :level => "2", :sort_order => "14")
Category.create(:name => "Fluids", :code => "fluids", :parent_id => non_gyne.id, :level => "2", :sort_order => "15")
Category.create(:name => "Others", :code => "ng_others", :parent_id => non_gyne.id, :level => "2", :sort_order => "16")
