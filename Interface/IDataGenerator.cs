using System.Collections.Generic;

namespace PROJECT.Interface
{
    public interface IDataGenerator<T> where T : class
    {
         /// <summary>
        /// Generates a collection of type T based on the properties in T
        /// </summary>
        /// <returns>List<T></returns>
        List<T> Collection();

        /// <summary>
        /// Generates the collection of type T of size = length 
        /// </summary>
        /// <param name="length">The size of the collection to be passed</param>
        /// <returns>A collection of type T based on the length passed</returns>
        List<T> Collection(int length);

        /// <summary>
        /// Generates an object of type T with data
        /// </summary>
        /// <returns>T with data based on the properties in T</returns>
        T Instance();
    }
}