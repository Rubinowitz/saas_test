class ProfilesController < ApplicationController
  # GET to /users/:user_id/profile/new
  def new
      #Render blank profile details form
      @profile = Profile.new
  end
  
  # POST to /user/:user_id/profile
  def create
      #ensure to have right user
      @user = User.find( params[:user_id] )
      #create linked profile for this user
      @profile = @user.build_profile( profile_params)
      if @profile.save
         flash[:success] = "Profile updated!"
         redirect_to user_path(id: params[:user_id] )
     else
         render action: :new
     end
  end
  
  # GET to /user/:user_id/profile/edit
  def edit
    @user = User.find( params[:user_id] )
    @profile = @user.profile
  end
  
  #PUT or PATCH to /user/:user_id/profile/
  def update
    @user = User.find( params[:user_id] )
    @profile = @user.profile
    #Mass assign profil attributes and save
    if @profile.update_attributes(profile_params)
      flash[:success] = "Profile updated!"
      redirect_to user_path(id: params[:user_id] )
    else
      render action :edit
    end
  end
  
  
  private
      def profile_params
          params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
      end
end