import React, { Component } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { RouteComponentProps } from "react-router-dom";
import FieldLabel from "./FieldLabel";

const IngredientSchema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.number().required(),
});

interface IngredientFormProps extends RouteComponentProps {
  ingredientsList: Ingredient[];
  updateIngredient?: (ingredient: Ingredient) => void;
  deleteIngredient?: (ingredientID: string) => void;
  addIngredients?: (ingredient: Ingredient) => void;
  setSelectingIngredientID: (ingredienID: string) => void;
}

class IngredientForm extends Component<IngredientFormProps> {
  public initialValues: Ingredient;
  private defaultInitialValues: any;

  constructor(props: IngredientFormProps) {
    super(props);
    this.defaultInitialValues = {
      name: "",
      quantity: "",
      id: "",
    };
    const {
      ingredientsList,
      updateIngredient,
      deleteIngredient,
      match,
    } = this.props;

    if (
      (updateIngredient || deleteIngredient) &&
      match.params &&
      (match.params as any).ingredientID
    ) {
      const ingredientID = (match.params as any).ingredientID;
      const ingredient = ingredientsList.find(
        (ingredient: Ingredient) => ingredient.id === ingredientID
      );

      this.initialValues = ingredient || this.defaultInitialValues;
    } else {
      this.initialValues = this.defaultInitialValues;
    }
  }

  componentWillReceiveProps = () => {
    const { match, ingredientsList } = this.props;
    const ingredientID = (match.params as any).ingredientID;
    const ingredient = ingredientsList.find(
      (ingredient: Ingredient) => ingredient.id === ingredientID
    );

    this.initialValues = ingredient || this.defaultInitialValues;
  };

  handleDeleteIngredient = () => {
    const { deleteIngredient } = this.props;

    deleteIngredient && deleteIngredient(this.initialValues.id);
  };

  handleSubmit = (values: Ingredient, actions: any) => {
    const {
      updateIngredient,
      addIngredients,
      setSelectingIngredientID,
      history,
    } = this.props;

    updateIngredient && updateIngredient(values);
    addIngredients && addIngredients(values);

    history.push("/shopping-list");
    setSelectingIngredientID("");
    actions.resetForm();
  };

  render() {
    const { addIngredients, setSelectingIngredientID, history } = this.props;

    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={IngredientSchema}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-5'>
                <div className='form-group'>
                  <FieldLabel htmlFor='ingredientName'>Name</FieldLabel>
                  <Field
                    placeholder='Name'
                    name='name'
                    id='ingredientName'
                    className='form-control'
                  />
                  <ErrorMessage name='name'>
                    {(errMsg) => <span className='text-danger'>{errMsg}</span>}
                  </ErrorMessage>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <FieldLabel htmlFor='ingredientQuantity'>Amount</FieldLabel>
                  <Field
                    placeholder='Amount'
                    name='quantity'
                    id='ingredientQuantity'
                    className='form-control'
                  />
                  <ErrorMessage name='quantity'>
                    {(errMsg) => <span className='text-danger'>{errMsg}</span>}
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div className='d-flex'>
              {addIngredients ? (
                <button type='submit' className='btn btn-success'>
                  Add
                </button>
              ) : (
                <span>
                  <button type='submit' className='btn btn-success'>
                    Update
                  </button>
                  <button
                    className='btn btn-danger ml-3'
                    type='button'
                    onClick={() => {
                      this.handleDeleteIngredient();
                      setSelectingIngredientID("");
                      history.push("/shopping-list");
                    }}
                  >
                    Delete
                  </button>
                </span>
              )}
              <button
                className='btn btn-primary ml-3'
                type='button'
                onClick={() => {
                  setFieldValue("name", "");
                  setFieldValue("quantity", "");
                }}
              >
                Clear
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

export default IngredientForm;
