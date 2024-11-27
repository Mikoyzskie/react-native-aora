import {
 Client,
 Account,
 ID,
 Avatars,
 Databases,
 Query,
 Models,
} from "react-native-appwrite";

interface CurrentUserAccount extends Models.User<Models.Preferences> {
 $id: string;
}

interface UserDocument {
 $id: string;
 accountId: string;
 avatar: string;
 username: string;
 email: string;
}

export const appwriteConfig = {
 endpoint: "https://cloud.appwrite.io/v1",
 platform: "com.myk.aora",
 projectId: "674690dc0006e3233e66",
 databaseId: "674692430019b93de0e4",
 userCollectionId: "674692570015fe8e0415",
 videoCollectionId: "674692720018f1d07ab8",
 storageId: "674693a2002d4c9c505c",
};

const client = new Client();

client
 .setEndpoint(appwriteConfig.endpoint)
 .setProject(appwriteConfig.projectId)
 .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
 email: string,
 password: string,
 username: string | undefined
) => {
 try {
  const newAccount = await account.create(
   ID.unique(),
   email,
   password,
   username
  );

  if (!newAccount) throw Error;

  const avatarUrl = avatars.getInitials(username);

  await signIn(email, password);

  const newUser = await databases.createDocument(
   appwriteConfig.databaseId,
   appwriteConfig.userCollectionId,
   ID.unique(),
   {
    accountId: newAccount.$id,
    email,
    username,
    avatar: avatarUrl,
   }
  );

  return newUser;
 } catch (error) {
  if (error instanceof Error) {
   throw new Error(error.message);
  }
 }
};

export const signIn = async (email: string, password: string) => {
 try {
  const session = await account.createEmailPasswordSession(email, password);

  return session;
 } catch (error) {
  if (error instanceof Error) {
   throw new Error(error.message);
  }
 }
};

export const getCurrentUser = async (): Promise<
 Models.Document | undefined
> => {
 try {
  const currentAccount = await account.get();

  if (!currentAccount) throw Error;

  const currentUser = await databases.listDocuments(
   appwriteConfig.databaseId,
   appwriteConfig.userCollectionId,
   [Query.equal("accountId", currentAccount.$id)]
  );

  if (!currentUser) throw Error;

  return currentUser.documents[0];
 } catch (error) {
  if (error instanceof Error) {
   throw new Error(error.message);
  }
 }
};
