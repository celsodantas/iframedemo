class UnicornsController < ApplicationController

  def index
    @unicorns = Unicorn.all
  end

  def show
    @unicorn = Unicorn.find(params[:id])
  end

  def new
    @unicorn = Unicorn.new
  end

  def edit
    @unicorn = Unicorn.find(params[:id])
  end

  def create
    @unicorn = Unicorn.new(params[:unicorn])

    if @unicorn.save
      flash[:notice] = 'Unicorn was successfully created.'
    else
      flash[:error] = @unicorn.errors.full_messages.to_sentence
      render action: "new"
    end
  end

  def update
    @unicorn = Unicorn.find(params[:id])

    if @unicorn.update_attributes(params[:unicorn])
      redirect_to @unicorn, notice: 'Unicorn was successfully updated.'
    else
      flash[:error] = @unicorn.errors.full_messages.to_sentence
      render action: "edit" 
    end
  end

  def destroy
    @unicorn = Unicorn.find(params[:id])
    @unicorn.destroy

    flash[:notice] = "Unicorn destroyed successfully"

    redirect_to unicorns_url
  end
end
