package slag_ulti;

import java.io.*;
import java.util.*;

public class ulti {
	// Read file data
	public static HashMap<String, String> ReadFileData(String fileName) {
		FileInputStream fis = null;
		HashMap<String, String> data = new HashMap<String, String>();
		try {
			fis = new FileInputStream(fileName);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Scanner scanner = new Scanner(fis);

		while (scanner.hasNextLine()) {
			String buffer = scanner.nextLine();
			String resultSplit[] = buffer.split("`");
			if (resultSplit.length > 1) {
				data.put(resultSplit[0], resultSplit[1]);
			} else {
				// System.out.println(resultSplit[0]);
			}
		}
		scanner.close();
		return data;
	}

	public static void WriteFileData(HashMap<String, String> data) {
		try {
			File file = new File("./src/data/Slag.txt");

			FileWriter fw = new FileWriter(file);
			String[] arrKey = new String[data.size()];
			data.keySet().toArray(arrKey);
			for (int i = 0; i < arrKey.length; i++) {
				String out = "";
				out = arrKey[i] + "`" + data.get(arrKey[i]) + "\n";
				fw.write(out);
			}

			fw.close();

		} catch (IOException ex) {
			System.out.println("Error: " + ex);
		}
	}

}
