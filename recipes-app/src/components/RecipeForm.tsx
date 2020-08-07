import React, { Component } from "react";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import { RouteComponentProps } from "react-router-dom";
import FieldLabel from "./FieldLabel";
import * as yup from "yup";

interface RecipeFormProps extends RouteComponentProps {
  recipesList?: Recipe[];
  createNewRecipe?: (recipe: Recipe) => void;
  updateRecipe?: (recipe: Recipe) => void;
}

const RecipeSchema = yup.object().shape({
  name: yup.string().required(),
  imageURL: yup.string().required(),
  description: yup.string().required(),
  ingredients: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      quantity: yup.number().required(),
    })
  ),
});

export default class RecipeForm extends Component<RecipeFormProps> {
  public initialValues: Recipe;
  private defaultInitialValues: Recipe;
  private previewImage: HTMLImageElement;

  constructor(props: RecipeFormProps) {
    super(props);
    this.defaultInitialValues = {
      id: "",
      name: "",
      description: "",
      imageURL: "",
      ingredients: [],
    };
    this.previewImage = new Image();

    const { match, recipesList } = this.props;

    if (match.params && (match.params as any).recipeID && recipesList) {
      const recipeID = (match.params as any).recipeID;
      const recipe = recipesList.find(
        (recipe: Recipe) => recipe.id === recipeID
      );

      this.initialValues = recipe ? recipe : this.defaultInitialValues;
    } else {
      this.initialValues = this.defaultInitialValues;
    }
  }

  handleCancelForm = () => {
    const { history } = this.props;

    history.push("/recipes");
  };

  handleSubmitForm = (values: Recipe, actions: any) => {
    const { history, createNewRecipe, updateRecipe } = this.props;

    createNewRecipe && createNewRecipe(values);
    updateRecipe && updateRecipe(values);

    actions.resetForm();
    history.push("/recipes");
  };

  validateImageURL = async (imageURL: string) => {
    try {
      const loadImagePromise = new Promise((resolve, reject) => {
        this.previewImage.onload = resolve;
        this.previewImage.onerror = reject;
        this.previewImage.src = imageURL;
      });

      await loadImagePromise;
    } catch (err) {
      return "Invalid image URL";
    }
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmitForm}
        validationSchema={RecipeSchema}
      >
        {({ handleSubmit, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <button type='submit' className='btn btn-success mr-3'>
                Save
              </button>
              <button
                className='btn btn-danger'
                onClick={this.handleCancelForm}
              >
                Cancel
              </button>
            </div>
            {/* Name */}
            <div className='form-group'>
              <FieldLabel htmlFor='recipeName'> Name</FieldLabel>
              <Field
                type='text'
                name='name'
                className='form-control'
                placeholder='Name'
                id='recipeName'
              ></Field>

              <ErrorMessage
                name='name'
                render={(errorMsg: string) => (
                  <div className='text-danger'>{errorMsg}</div>
                )}
              />
            </div>
            {/* ImageURL */}
            <div className='form-group'>
              <FieldLabel htmlFor='recipeImageURL'> Image URL</FieldLabel>
              <Field
                type='text'
                name='imageURL'
                className='form-control'
                placeholder='Image URL'
                id='recipeImageURL'
                validate={this.validateImageURL}
              ></Field>
              <ErrorMessage
                name='imageURL'
                render={(errorMsg: string) => (
                  <div className='text-danger'>{errorMsg}</div>
                )}
              />
              {/* Image Preview */}
              {!errors.imageURL && values.imageURL ? (
                <div className='mt-3'>
                  <img
                    src={values.imageURL}
                    className='img-thumbnail'
                    style={{ maxWidth: "10rem" }}
                    alt={values.description}
                  />
                </div>
              ) : null}
            </div>
            {/* Description */}
            <div className='form-group'>
              <FieldLabel htmlFor='recipeDescription'> Description</FieldLabel>
              <Field
                as='textarea'
                rows={10}
                name='description'
                className='form-control'
                placeholder='Description'
                id='recipeDescription'
              ></Field>
              <ErrorMessage
                name='description'
                render={(errorMsg: string) => (
                  <div className='text-danger'>{errorMsg}</div>
                )}
              />
            </div>
            {/* Ingredients */}
            <FieldArray
              name='ingredients'
              render={(arrayHelpers) => (
                <div className='mt-4'>
                  {values.ingredients.length
                    ? values.ingredients?.map((ingredient, index) => (
                        <div className='row mb-2' key={index}>
                          <div className='col-md-8'>
                            <Field
                              type='text'
                              name={`ingredients[${index}].name`}
                              className='form-control'
                              placeholder='name'
                            />
                            <ErrorMessage
                              name={`ingredients[${index}].name`}
                              render={() => (
                                <div className='text-danger'>
                                  ingredient name is required
                                </div>
                              )}
                            />
                          </div>
                          <div className='col-md-3'>
                            <Field
                              type='text'
                              placeholder='quantity'
                              name={`ingredients.${index}.quantity`}
                              className='form-control'
                            />
                            <ErrorMessage
                              name={`ingredients.${index}.quantity`}
                              render={(msg) => (
                                <div className='text-danger'>{msg}</div>
                              )}
                            />
                          </div>
                          <div className='col-md-1'>
                            <button
                              className='btn btn-danger'
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))
                    : null}
                  {/* Add Ingredient Button */}
                  <div className='mt-4'>
                    <button
                      className='btn btn-success'
                      onClick={() =>
                        arrayHelpers.push({ name: "", quantity: "" })
                      }
                    >
                      Add Ingredient
                    </button>
                  </div>
                </div>
              )}
            />
          </form>
        )}
      </Formik>
    );
  }
}
